function loadNames(callback) {
    fetch("noms.txt")
        .then(response => {
            if (!response.ok) throw new Error("No s'ha pogut carregar el fitxer.");
            return response.text();
        })
        .then(data => {
            const noms = data.split("\n").map(n => n.trim()).filter(n => n);
            console.log("Noms carregats:", noms);
            alert("Noms carregats correctament!");
            if (noms.length > 0) {
                callback(noms); // Retorna els noms
            }
        })
        .catch(error => {
            console.error("Error carregant els noms:", error);
            alert("Error carregant els noms. Comprova la consola.");
        });
}
