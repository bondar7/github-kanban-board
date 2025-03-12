const extractRepoFullName = (repoUrl: string): string => {
    const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
    return match ? `${match[1]}/${match[2]}` : "";
};

export default extractRepoFullName;