import extractRepoFullName from './extractRepoFullName';

describe("extractRepoFullName", () => {

    it("should extract the full repository name from a valid GitHub URL", () => {
        const repoUrl = "https://github.com/username/repository";
        const result = extractRepoFullName(repoUrl);
        expect(result).toBe("username/repository");
    });

    it("should handle URLs with `www` in them", () => {
        const repoUrl = "https://www.github.com/username/repository";
        const result = extractRepoFullName(repoUrl);
        expect(result).toBe("username/repository");
    });

    it("should return an empty string for an invalid GitHub URL", () => {
        const repoUrl = "https://example.com/username/repository";
        const result = extractRepoFullName(repoUrl);
        expect(result).toBe("");
    });

    it("should return an empty string if the URL doesn't have a repository path", () => {
        const repoUrl = "https://github.com/username/";
        const result = extractRepoFullName(repoUrl);
        expect(result).toBe("");
    });

    it("should handle URLs with query parameters or fragments", () => {
        const repoUrl = "https://github.com/username/repository/tree/main?ref=branch";
        const result = extractRepoFullName(repoUrl);
        expect(result).toBe("username/repository");
    });

    it("should handle URLs with trailing slashes", () => {
        const repoUrl = "https://github.com/username/repository/";
        const result = extractRepoFullName(repoUrl);
        expect(result).toBe("username/repository");
    });

});
