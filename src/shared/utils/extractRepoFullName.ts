const extractRepoFullName = (repoUrl: string): string | null => {
    const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
    return match ? `${match[1]}/${match[2]}` : null;
};

export default extractRepoFullName;