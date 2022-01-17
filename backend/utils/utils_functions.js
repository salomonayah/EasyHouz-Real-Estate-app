const provideAnId = (documents) => {

    if(documents[0]) {

        return documents.map(
            (documentData) => {
                let document = documentData.toJSON();
                const id = document._id
                delete document.__v;
                delete document._id;
                document.id = id
                return document
            }
        );

    } else {

        let documentFormatted = documents.toJSON();
        const id = documentFormatted._id
        delete documentFormatted.__v;
        delete documentFormatted._id;
        documentFormatted.id= id
        return documentFormatted

    }

}

module.exports = provideAnId