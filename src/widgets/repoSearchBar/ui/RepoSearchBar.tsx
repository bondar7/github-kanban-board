import { useCallback, useState } from "react";
import { Container, Form } from "react-bootstrap";
import RepoInput from "../../../shared/ui/repoInput/RepoInput";
import LoadRepoIssuesButton from "../../../features/repoLoader/ui/LoadRepoIssuesButton";
import extractRepoFullName from "../../../shared/utils/extractRepoFullName";
import { issuesApi } from "../../../entities/Issue";
import { resetErrors, resetIssues } from "../../../entities/Issue/model/slice/slice";
import useAppDispatch from "../../../shared/hooks/useAppDispatch";
import { repoApi, selectRepoFullName } from "../../../entities/Repo";
import useAppSelector from "../../../shared/hooks/useAppSelector";
import { setRepoFullName } from "../../../entities/Repo/model/slice/slice";

const RepoSearchBar = () => {
    const [repoURL, setRepoURL] = useState("");
    const [toSkip, setToSkip] = useState(false);
    const repoFullName = useAppSelector(selectRepoFullName);

    const dispatch = useAppDispatch();

    const memoizedSetRepoURL = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            setRepoURL(e.target.value);
        },
        []
    );

    // Fetch repo
    const { isFetching: isRepoLoading } =
        repoApi.useGetRepoQuery(repoFullName, { skip: !repoFullName, refetchOnMountOrArgChange: true });

    // Fetch issues
    const { isFetching: isOpenIssuesLoading, refetch: refetchOpenIssues } =
        issuesApi.useGetOpenIssuesQuery(repoFullName, {
            skip: !repoFullName || toSkip,
        });

    const { isFetching: isInProgressIssuesLoading, refetch: refetchInProgressIssues } =
        issuesApi.useGetInProgressIssuesQuery(repoFullName, {
            skip: !repoFullName || toSkip,
        });

    const { isFetching: isClosedIssuesLoading, refetch: refetchClosedIssues } =
        issuesApi.useGetClosedIssuesQuery(repoFullName, {
            skip: !repoFullName || toSkip,
        });

    const handleOnLoad = useCallback(
        (e: React.MouseEvent) => {
            e.preventDefault();
            if (!repoURL) return;

            const newRepoFullName = extractRepoFullName(repoURL);
            const savedIssues = localStorage.getItem(`kanban_${newRepoFullName}`);

            setToSkip(!!savedIssues);

            if (repoFullName === newRepoFullName) {
                if (!savedIssues) {
                    refetchOpenIssues?.();
                    refetchInProgressIssues?.();
                    refetchClosedIssues?.();
                }
            } else {
                dispatch(setRepoFullName(newRepoFullName));
                dispatch(resetErrors());

                if (!savedIssues) {
                    dispatch(resetIssues());
                }
            }

            setRepoURL("");
        },
        [
            dispatch,
            repoURL,
            repoFullName,
            refetchOpenIssues,
            refetchInProgressIssues,
            refetchClosedIssues,
        ]
    );

    const isIssuesLoading = isRepoLoading || isOpenIssuesLoading || isInProgressIssuesLoading || isClosedIssuesLoading;

    return (
        <Container className="my-3">
            <Form className="d-flex gap-3">
                <RepoInput
                    repoURL={repoURL}
                    setRepoURL={memoizedSetRepoURL}
                    data-testid="repo-input"
                />
                <LoadRepoIssuesButton
                    isLoading={isIssuesLoading}
                    handleOnLoad={handleOnLoad}
                    data-testid="load-issues-button"
                />
            </Form>
        </Container>
    );
};

export default RepoSearchBar;
