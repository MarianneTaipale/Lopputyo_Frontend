export function getCustomers() {
    return fetch(import.meta.env.VITE_API_URL + '/customers')
        .then(response => {
            if (!response.ok)
                throw new Error("Error when fetching cars: " + response.statusText);

            return response.json();
        })
}