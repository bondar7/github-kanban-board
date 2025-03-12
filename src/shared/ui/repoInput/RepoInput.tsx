import { Form } from "react-bootstrap";

interface InputProps {
    repoURL: string;
    setRepoURL: React.Dispatch<React.SetStateAction<string>>;
}

const RepoInput = ({repoURL, setRepoURL}: InputProps) => {
    return (
        <Form.Control
            type="text"
            placeholder="Enter repo URL"
            value={repoURL}
            onChange={(e) => setRepoURL(e.target.value)}
        />
    );
};

export default RepoInput;