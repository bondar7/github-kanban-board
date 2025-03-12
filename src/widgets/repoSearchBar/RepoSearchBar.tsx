import {useCallback, useState} from "react";
import {Container, Form} from "react-bootstrap";
import RepoInput from "../../shared/ui/repoInput/RepoInput.tsx";
import LoadRepoIssuesButton from "../../features/repoLoader/ui/LoadRepoIssuesButton.tsx";
import extractRepoFullName from "../../shared/utils/extractRepoFullName.ts";
import {issuesApi} from "../../entities/Issue";
import {setIssues} from "../../entities/Issue/model/slice.ts";
import useAppDispatch from "../../shared/hooks/useAppDispatch.ts";
import {repoApi} from "../../entities/Repo";

const RepoSearchBar = () => {
    const [repoURL, setRepoURL] = useState("");
    const [repoFullName, setRepoFullName] = useState<string>("");

    const dispatch = useAppDispatch();

    const memoizedSetRepoURL = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setRepoURL(e.target.value);
    }, []);

    // Fetch repo
    const { isFetching: isRepoLoading } =
        repoApi.useGetRepoQuery(repoFullName, { skip: !repoFullName });

    // Fetch issues
    const { isFetching: isOpenIssuesLoading } =
        issuesApi.useGetOpenIssuesQuery(repoFullName, {
            skip: !repoFullName,
            refetchOnMountOrArgChange: true
        });

    const { isFetching: isInProgressIssuesLoading } =
        issuesApi.useGetInProgressIssuesQuery(repoFullName, {
            skip: !repoFullName,
            refetchOnMountOrArgChange: true
        });

    const { isFetching: isClosedIssuesLoading} =
        issuesApi.useGetClosedIssuesQuery(repoFullName, {
            skip: !repoFullName,
            refetchOnMountOrArgChange: true
        });

    const handleOnLoad = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        if (repoURL) {
            dispatch(setIssues([]));
            setRepoFullName(extractRepoFullName(repoURL));
            setRepoURL("");
        }
    }, [repoURL, dispatch]);


    const isIssuesLoading = isRepoLoading || isOpenIssuesLoading || isInProgressIssuesLoading || isClosedIssuesLoading;

    return (
        <Container className="my-3">
            <Form className="d-flex gap-3">
                <RepoInput repoURL={repoURL} setRepoURL={memoizedSetRepoURL} />
                <LoadRepoIssuesButton
                    isLoading={isIssuesLoading}
                    handleOnLoad={handleOnLoad}
                />
            </Form>
        </Container>
    );
};

export default RepoSearchBar;
