const checkBaseAccess = (req, res, next) => {
    try {

        // Admin can access all bases
        if (!req.user.baseId) {
            return next();
        }

        const baseId =
            req.body.baseId ||
            req.query.baseId ||
            req.params.baseId;

        if (!baseId) {
            return res.status(400).json({
                status: false,
                msg: "Base ID is required"
            });
        }

        console.log("User Base:", req.user.baseId.toString());
        console.log("Requested Base:", baseId.toString());

        if (req.user.baseId.toString() !== baseId.toString()) {
            return res.status(403).json({
                status: false,
                msg: "You do not have access to this base"
            });
        }

        console.log("BASE ACCESS PASSED");

        next();

    } catch (error) {
        console.log("BASE ACCESS ERROR:", error.message);

        return res.status(403).json({
            status: false,
            msg: error.message
        });
    }
};

module.exports = checkBaseAccess;