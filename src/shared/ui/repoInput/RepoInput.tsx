import { Form } from "react-bootstrap";
import {memo} from "react";

interface InputProps {
    repoURL: string;
    setRepoURL: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RepoInput = ({repoURL, setRepoURL}: InputProps) => {
    return (
        <Form.Control
            type="text"
            placeholder="Enter repo URL"
            value={repoURL}
            onChange={setRepoURL}
            className="w-100"
        />
    );
};

export default memo(RepoInput);