module.exports = {
    list: (req, res) => {
        res.status(200).json({
            "apartment": "3000",
            "postalCode": "G1Q 1Q9",
            "address": { "text": "666 1st avenue, City, PV, Country", "city": "City" },
            "status": "confirmed",
            profile: {
                "fullName": "John Doe",
                "telephone": "5552221212"
            },
            "type": "admin",
            "email": 'test@test.com',
            "valid": true,
            "unique_id": 1
        });
    }
};
