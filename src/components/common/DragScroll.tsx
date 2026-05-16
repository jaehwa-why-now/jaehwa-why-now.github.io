import { useCallback, useEffect, useRef, useState } from 'react';
import type {
  FocusEventHandler,
  HTMLAttributes,
  MouseEventHandler,
  PointerEventHandler,
  ReactNode,
  UIEventHandler,
  WheelEventHandler,
} from 'react';
import styles from './DragScroll.module.css';

interface DragScrollProps extends HTMLAttributes<HTMLDivElement> {
  autoScroll?: boolean;
  autoScrollMediaQuery?: string;
  autoScrollResumeDelay?: number;
  autoScrollSpeed?: number;
  children: ReactNode;
  className?: string;
  loopSegments?: number;
}

type DragState = {
  active: boolean;
  moved: boolean;
  pointerId: number | null;
  scrollLeft: number;
  startX: number;
};

type LoopMetrics = {
  lower: number;
  start: number;
  upper: number;
  width: number;
};

const DRAG_THRESHOLD = 4;

export const DragScroll = ({
  autoScroll = false,
  autoScrollMediaQuery,
  autoScrollResumeDelay = 2200,
  autoScrollSpeed = 0.28,
  children,
  className = '',
  loopSegments = 1,
  onBlur,
  onClickCapture,
  onFocus,
  onPointerCancel,
  onPointerDown,
  onPointerMove,
  onPointerUp,
  onScroll,
  onWheel,
  ...props
}: DragScrollProps) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const animationFrame = useRef<number | null>(null);
  const interactionActive = useRef(false);
  const isFocused = useRef(false);
  const lastFrameTime = useRef<number | null>(null);
  const resumeAt = useRef(0);
  const scrollIdleTimeout = useRef<number | null>(null);
  const dragState = useRef<DragState>({
    active: false,
    moved: false,
    pointerId: null,
    scrollLeft: 0,
    startX: 0,
  });
  const [isDragging, setIsDragging] = useState(false);

  const canAutoScroll = useCallback(() => {
    if (!autoScroll || typeof window === 'undefined') {
      return false;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return false;
    }

    if (autoScrollMediaQuery && !window.matchMedia(autoScrollMediaQuery).matches) {
      return false;
    }

    const node = scrollerRef.current;
    return Boolean(node && node.scrollWidth > node.clientWidth);
  }, [autoScroll, autoScrollMediaQuery]);

  const getLoopMetrics = useCallback((): LoopMetrics | null => {
    const node = scrollerRef.current;

    if (!node || loopSegments <= 1) {
      return null;
    }

    const track = node.firstElementChild;
    const markedSegments = track
      ? Array.from(track.querySelectorAll('[data-loop-start="true"]')).filter(
          (child): child is HTMLElement => child instanceof HTMLElement,
        )
      : [];
    const wrapperSegments = track
      ? Array.from(track.children).filter(
          (child): child is HTMLElement => child instanceof HTMLElement,
        )
      : [];
    const segments = markedSegments.length >= loopSegments
      ? markedSegments
      : wrapperSegments;
    const firstSegment = segments[0];
    const startIndex = Math.floor(loopSegments / 2);
    const previousSegment = segments[startIndex - 1];
    const startSegment = segments[startIndex];
    const nextSegment = segments[startIndex + 1];

    if (!firstSegment || !previousSegment || !startSegment || !nextSegment) {
      return null;
    }

    const lower = previousSegment.offsetLeft - firstSegment.offsetLeft;
    const start = startSegment.offsetLeft - firstSegment.offsetLeft;
    const upper = nextSegment.offsetLeft - firstSegment.offsetLeft;
    const width = upper - start;

    if (lower < 0 || start <= lower || upper <= start || width <= 0) {
      return null;
    }

    return {
      lower,
      start,
      upper,
      width,
    };
  }, [loopSegments]);

  const normalizeLoopPosition = useCallback(() => {
    const node = scrollerRef.current;
    const metrics = getLoopMetrics();

    if (!node || !metrics) {
      return;
    }

    while (node.scrollLeft >= metrics.upper) {
      node.scrollLeft -= metrics.width;
    }

    while (node.scrollLeft < metrics.lower) {
      node.scrollLeft += metrics.width;
    }
  }, [getLoopMetrics]);

  const scheduleLoopNormalize = useCallback((delay = 180) => {
    if (typeof window === 'undefined') {
      return;
    }

    if (scrollIdleTimeout.current !== null) {
      window.clearTimeout(scrollIdleTimeout.current);
    }

    scrollIdleTimeout.current = window.setTimeout(() => {
      normalizeLoopPosition();
      scrollIdleTimeout.current = null;
    }, delay);
  }, [normalizeLoopPosition]);

  const pauseAutoScroll = (delay = autoScrollResumeDelay) => {
    interactionActive.current = true;
    resumeAt.current = Math.max(resumeAt.current, performance.now() + delay);
  };

  const resumeAutoScroll = (delay = autoScrollResumeDelay) => {
    interactionActive.current = false;
    resumeAt.current = Math.max(resumeAt.current, performance.now() + delay);
  };

  const resetMovedFlag = () => {
    window.setTimeout(() => {
      dragState.current.moved = false;
    }, 0);
  };

  const stopDragging = () => {
    const node = scrollerRef.current;
    const { pointerId } = dragState.current;

    if (node && pointerId !== null && node.hasPointerCapture(pointerId)) {
      node.releasePointerCapture(pointerId);
    }

    dragState.current.active = false;
    dragState.current.pointerId = null;
    setIsDragging(false);
    resumeAutoScroll();
    resetMovedFlag();
  };

  useEffect(() => {
    if (!autoScroll) {
      return undefined;
    }

    const node = scrollerRef.current;

    if (!node || typeof window === 'undefined') {
      return undefined;
    }

    const setInitialLoopPosition = () => {
      if (!canAutoScroll()) {
        return;
      }

      const metrics = getLoopMetrics();

      if (metrics && node.scrollLeft < 1) {
        node.scrollLeft = metrics.start;
      }
    };

    const tick = (timestamp: number) => {
      animationFrame.current = window.requestAnimationFrame(tick);

      if (!canAutoScroll()) {
        lastFrameTime.current = timestamp;
        return;
      }

      setInitialLoopPosition();

      const elapsed = lastFrameTime.current === null
        ? 0
        : Math.min(timestamp - lastFrameTime.current, 32);
      lastFrameTime.current = timestamp;

      if (
        interactionActive.current ||
        isFocused.current ||
        timestamp < resumeAt.current
      ) {
        normalizeLoopPosition();
        return;
      }

      node.scrollLeft += elapsed * autoScrollSpeed;
      normalizeLoopPosition();
    };

    const handleResize = () => {
      lastFrameTime.current = null;
      setInitialLoopPosition();
    };

    setInitialLoopPosition();
    animationFrame.current = window.requestAnimationFrame(tick);
    window.addEventListener('resize', handleResize);

    return () => {
      if (animationFrame.current !== null) {
        window.cancelAnimationFrame(animationFrame.current);
      }

      if (scrollIdleTimeout.current !== null) {
        window.clearTimeout(scrollIdleTimeout.current);
      }

      window.removeEventListener('resize', handleResize);
      animationFrame.current = null;
      lastFrameTime.current = null;
      scrollIdleTimeout.current = null;
    };
  }, [
    autoScroll,
    autoScrollMediaQuery,
    autoScrollResumeDelay,
    autoScrollSpeed,
    canAutoScroll,
    getLoopMetrics,
    normalizeLoopPosition,
    scheduleLoopNormalize,
  ]);

  const handleFocus: FocusEventHandler<HTMLDivElement> = (event) => {
    onFocus?.(event);
    isFocused.current = true;
    pauseAutoScroll();
  };

  const handleBlur: FocusEventHandler<HTMLDivElement> = (event) => {
    onBlur?.(event);

    if (!event.currentTarget.contains(event.relatedTarget)) {
      isFocused.current = false;
      resumeAutoScroll();
    }
  };

  const handleWheel: WheelEventHandler<HTMLDivElement> = (event) => {
    onWheel?.(event);
    pauseAutoScroll();
    scheduleLoopNormalize(220);
    resumeAutoScroll();
  };

  const handleScroll: UIEventHandler<HTMLDivElement> = (event) => {
    onScroll?.(event);

    if (
      interactionActive.current ||
      dragState.current.active ||
      performance.now() < resumeAt.current
    ) {
      scheduleLoopNormalize();
    }
  };

  const handlePointerDown: PointerEventHandler<HTMLDivElement> = (event) => {
    onPointerDown?.(event);
    pauseAutoScroll();

    if (event.defaultPrevented || event.pointerType !== 'mouse' || event.button !== 0) {
      return;
    }

    const node = scrollerRef.current;

    if (!node || node.scrollWidth <= node.clientWidth) {
      return;
    }

    dragState.current = {
      active: true,
      moved: false,
      pointerId: event.pointerId,
      scrollLeft: node.scrollLeft,
      startX: event.clientX,
    };
    node.setPointerCapture(event.pointerId);
    setIsDragging(true);
  };

  const handlePointerMove: PointerEventHandler<HTMLDivElement> = (event) => {
    onPointerMove?.(event);

    const node = scrollerRef.current;
    const current = dragState.current;

    if (!node || !current.active) {
      return;
    }

    const deltaX = event.clientX - current.startX;

    if (Math.abs(deltaX) > DRAG_THRESHOLD) {
      current.moved = true;
    }

    node.scrollLeft = current.scrollLeft - deltaX;

    if (current.moved) {
      event.preventDefault();
    }
  };

  const handlePointerUp: PointerEventHandler<HTMLDivElement> = (event) => {
    onPointerUp?.(event);

    if (dragState.current.active) {
      stopDragging();
      scheduleLoopNormalize(120);
      return;
    }

    resumeAutoScroll();
  };

  const handlePointerCancel: PointerEventHandler<HTMLDivElement> = (event) => {
    onPointerCancel?.(event);

    if (dragState.current.active) {
      stopDragging();
      scheduleLoopNormalize(120);
      return;
    }

    resumeAutoScroll();
  };

  const handleClickCapture: MouseEventHandler<HTMLDivElement> = (event) => {
    if (dragState.current.moved) {
      event.preventDefault();
      event.stopPropagation();
      dragState.current.moved = false;
      return;
    }

    onClickCapture?.(event);
  };

  const classes = [styles.dragScroll, isDragging ? styles.dragging : '', className]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={scrollerRef}
      className={classes}
      onBlur={handleBlur}
      onClickCapture={handleClickCapture}
      onFocus={handleFocus}
      onPointerCancel={handlePointerCancel}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onScroll={handleScroll}
      onWheel={handleWheel}
      {...props}
    >
      {children}
    </div>
  );
};
