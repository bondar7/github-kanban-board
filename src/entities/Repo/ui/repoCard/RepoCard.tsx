import {Container, Spinner} from "react-bootstrap";
import {FaStar} from "react-icons/fa";
import useAppSelector from "../../../../shared/hooks/useAppSelector";
import {selectCurrentRepo, selectIsRepoLoading} from "../../model/selectors";

const formatStars = (stars: number) => {
    return stars >= 1000 ? (stars / 1000).toFixed(1) + "K" : stars.toString();
};

const RepoCard = () => {
    const repo = useAppSelector(selectCurrentRepo);
    const isLoading = useAppSelector(selectIsRepoLoading);

    if (isLoading) {
        return (
            <Container
                className="d-flex align-items-center justify-content-center py-4"
                style={{ fontSize: "1.2rem", fontWeight: 500 }}
            >
                <Spinner animation="border" variant="primary" role="progressbar" aria-label="Loading..." />
                <span>Loading...</span>
            </Container>
        );
    }

    if (!repo) {
        return (
            <Container
                className="d-flex align-items-center justify-content-center py-4"
                style={{ fontSize: "1.2rem", fontWeight: 500 }}
            >
                <span style={{ color: "#6c757d" }}>No repository found. Please search for a repository.</span>
            </Container>
        );
    }

    return (
        <Container
            className="d-flex align-items-center justify-content-center gap-3 py-2"
            style={{
                fontSize: "1.2rem",
                fontWeight: 500,
                borderBottom: "1px solid #ddd",
            }}
        >
            <a
                href={repo.owner.html_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    textDecoration: "none",
                    color: "#007bff",
                    fontWeight: "bold",
                }}
            >
                {repo.owner.login}
            </a>
            <span style={{ color: "#6c757d" }}>›</span>
            <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                    textDecoration: "none",
                    color: "#007bff",
                    fontWeight: "bold",
                }}
            >
                {repo.name}
            </a>
            <div className="d-flex align-items-center gap-2">
                <FaStar className="text-warning" size={25} aria-label="star"/>
                <span style={{ fontSize: "1.1rem", fontWeight: "bold" }}>
                    {formatStars(repo.stargazers_count)} stars
                </span>
            </div>
        </Container>
    );
};

export default RepoCard;
