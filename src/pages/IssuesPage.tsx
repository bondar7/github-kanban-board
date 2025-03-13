import {Col, Container, Row} from "react-bootstrap";
import RepoSearchBar from "../widgets/repoSearchBar/ui/RepoSearchBar.tsx";
import RepoCard from "../entities/Repo/ui/repoCard/RepoCard.tsx";
import KanbanBoard from "../widgets/kanbanBoard/ui/KanbanBoard.tsx";

const IssuesPage = () => {

    return (
        <Container className="py-4">
            <h1 className="text-center mb-4" style={{ fontWeight: "bold", color: "#343a40" }}>
                GitHub Issue Tracker
            </h1>

            <Row className="justify-content-center mb-4">
                <Col md={8}>
                    <RepoSearchBar />
                </Col>
            </Row>

            <Row className="justify-content-center">
                <Col md={8}>
                    <RepoCard />
                </Col>
            </Row>

            <Row className="mt-4">
                <Col>
                    <KanbanBoard />
                </Col>
            </Row>
        </Container>
    );
};

export default IssuesPage;
