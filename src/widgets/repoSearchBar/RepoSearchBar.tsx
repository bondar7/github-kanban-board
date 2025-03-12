import {useCallback, useState} from "react";
import {Container, Form} from "react-bootstrap";
import RepoInput from "../../shared/ui/repoInput/RepoInput.tsx";
import LoadRepoIssuesButton from "../../features/repoLoader/ui/LoadRepoIssuesButton.tsx";
import extractRepoFullName from "../../shared/utils/extractRepoFullName.ts";
import {issuesApi} from "../../entities/Issue";
import {repoApi} from "../../entities/Repo";

const RepoSearchBar = () => {
    const [repoURL, setRepoURL] = useState("");
    const [repoFullName, setRepoFullName] = useState<string>("");

    const memoizedSetRepoURL = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setRepoURL(e.target.value);
    }, []);

    const handleOnLoad = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        if (repoURL) setRepoFullName(extractRepoFullName(repoURL));
    }, [repoURL]);

    const { isLoading: isRepoLoading } = repoApi.useGetRepoQuery(repoFullName, {
        skip: !repoFullName,
    });

    const { isLoading: isIssuesLoading } = issuesApi.useGetIssuesQuery(repoFullName, {
        skip: !repoFullName,
    });

    return (
        <Container className="my-3">
            <Form className="d-flex gap-3">
                <RepoInput repoURL={repoURL} setRepoURL={memoizedSetRepoURL} />
                <LoadRepoIssuesButton
                    isLoading={isRepoLoading || isIssuesLoading}
                    handleOnLoad={handleOnLoad}
                />
            </Form>
        </Container>
    );
};

export default RepoSearchBar;