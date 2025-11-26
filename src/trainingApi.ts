export function getTrainings() {
    return fetch(import.meta.env.VITE_API_URL + '/trainings')
        .then(response => {
            if (!response.ok)
                throw new Error("Error when fetching cars: " + response.statusText);

            return response.json();
        })
}