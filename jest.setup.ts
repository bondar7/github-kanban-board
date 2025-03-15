import '@testing-library/jest-dom';
import fetchMock from "jest-fetch-mock";
fetchMock.enableMocks();
process.removeAllListeners('warning');
jest.setTimeout(30000);