// Advanced Todo List with Pagination, Filtering, Sorting, Debounce, Virtualization, Infinite Scroll
import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';

const rowHeight = 40;
const visibleRows = 10;

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const containerRef = useRef(null);
  const [scrollTop, setScrollTop] = useState(0);
  const timerRef = useRef(null);
  const [timerRunning, setTimerRunning] = useState(false);

  // Debounce query
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(query), 300);
    return () => clearTimeout(handler);
  }, [query]);

  // Fetch todos
  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/todos?_limit=20&_page=${page}&q=${debouncedQuery}&sort=${sortBy}`,
          { signal: controller.signal }
        );
        const data = await res.json();
        if (data.length === 0) setHasMore(false);
        setTodos(prev => [...prev, ...data]);
      } catch (err) {
        if (err.name !== 'AbortError') console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    return () => controller.abort();
  }, [page, debouncedQuery, sortBy]);

  // Infinite Scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100 && hasMore && !loading
      ) {
        setPage(p => p + 1);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, loading]);

  // Filtering logic
  const visibleTodos = useMemo(() => {
    return todos.filter(todo => todo.title.includes(debouncedQuery));
  }, [todos, debouncedQuery]);

  // Timer for interval API calls (mocked)
  useEffect(() => {
    if (timerRunning) {
      timerRef.current = setInterval(() => {
        console.log("Polling API or refreshing data...");
      }, 10000);
    }
    return () => clearInterval(timerRef.current);
  }, [timerRunning]);

  // Virtualization
  const handleScrollList = () => {
    setScrollTop(containerRef.current.scrollTop);
  };

  const startIdx = Math.floor(scrollTop / rowHeight);
  const endIdx = Math.min(startIdx + visibleRows, visibleTodos.length);
  const virtualItems = visibleTodos.slice(startIdx, endIdx);

  return (
    <div>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <select onChange={e => setSortBy(e.target.value)}>
        <option value="date">Date</option>
        <option value="title">Title</option>
      </select>
     

      <div
        ref={containerRef}
        onScroll={handleScrollList}
        style={{ height: rowHeight * visibleRows, overflowY: 'auto', border: '1px solid #ccc' }}
      >
        <div style={{ height: visibleTodos.length * rowHeight, position: 'relative' }}>
          {virtualItems.map((todo, i) => (
            <div
              key={startIdx + i}
              style={{
                position: 'absolute',
                top: (startIdx + i) * rowHeight,
                height: rowHeight,
                width: '100%',
                borderBottom: '1px solid #eee'
              }}
            >
              {todo.title}
            </div>
          ))}
        </div>
      </div>

      {loading && <div>Loading...</div>}
    </div>
  );
};

export default TodoList;
