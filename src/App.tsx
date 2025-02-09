import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import TodoPage from '@/pages/to-do';
import TagsPage from '@/pages/tags';
import NotFoundPage from '@/pages/not-found';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TodoPage />} />
        <Route path="/tags" element={<TagsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
