import api from './api';

const ENROLLMENTS_URL = '/enrollments';

/**
 * Service function to get the latest enrollment for the authenticated student.
 * This is used to determine the status of the student's current application.
 * @returns {Promise} A promise that resolves to the latest enrollment object.
 */
export const getLatestEnrollment = () => {
  return api.get(`${ENROLLMENTS_URL}/my-latest`);
};

/**
 * Service function to submit the enrollment form data to the backend API.
 * This function will handle the multi-part form data for documents and JSON.
 * @param {object} formData The combined data from all enrollment form steps.
 * @param {List<File>} documents A list of document files to upload.
 * @returns {Promise} A promise that resolves to the API response.
 */
export const submitEnrollmentForm = (formData, documents) => {
    const data = new FormData();
    data.append('enrollment', JSON.stringify(formData));
    documents.forEach((doc, index) => {
        data.append(`documents[${index}]`, doc);
    });

    return api.post(ENROLLMENTS_URL, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};