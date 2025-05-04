import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Habits from './pages/Habits';
import Details from './pages/Details';
import Start from './pages/Start';
import LogCompletion from './pages/LogCompletion';
import ViewStreaks from './pages/ViewStreaks';
import ResetHabit from './pages/ResetHabit';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Start />} />

        {/* Shared Layout Route */}
        <Route path="/" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="habits" element={<Habits />} />
          <Route path="habits/:id" element={<Details />} />
          <Route path="log-completion" element={<LogCompletion />} />
          <Route path="view-streaks" element={<ViewStreaks />} />
          <Route path="reset-habit" element={<ResetHabit />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
