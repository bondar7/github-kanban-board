import {Button} from "react-bootstrap";
import {repoApi} from "../../../entities/Repo";
import {issuesApi} from "../../../entities/Issue";
import extractRepoFullName from "../../../shared/utils/extractRepoFullName.ts";

interface ButtonProps {
    repo_url: string;
}

const LoadRepoIssuesButton = ({repo_url}: ButtonProps) => {

    const repoFullName = extractRepoFullName(repo_url);

    const handleOnClick = () => {
        if (repoFullName) {
            repoApi.useGetRepoQuery(repoFullName); // fetch repo data with repo full name
            issuesApi.useGetIssuesQuery(repoFullName) // fetch issues with repo full name
        } else return;
    };

    return <Button onClick={handleOnClick}>Load Issues</Button>
};

export default LoadRepoIssuesButton;