import { useCandidate } from './features/candidate/useCandidate';
import CandidateForm from './features/candidate/CandidateForm';
import JobList from './components/JobList/JobList';
import './index.css';

function App() {
    const { candidate, loading, error, searchCandidate } = useCandidate();

    return (
        <div>
            <h1>Nimble Gravity Challenge</h1>
            {!candidate && (
                <CandidateForm 
                    loading={loading} 
                    error={error} 
                    searchCandidate={searchCandidate} 
                />
            )}
            {candidate && <JobList candidate={candidate} />}
        </div>
    );
}

export default App;
