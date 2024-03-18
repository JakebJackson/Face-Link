const router = require('express').Router();
/*
router.post('/loadModels', async (req, res) => {
    try {
        var filePath = path.join(path.resolve(__dirname, '..'), '/public/weights');
        //console.log(filePath);
        var directoryContent = [];
        getDirectoryContent(filePath, directoryContent);
        //console.log(directoryContent);
        res.send(directoryContent);
    } catch (err) {
        res.status(400).json(err);
    }
});

function getDirectoryContent(dir, arr) {
    fs.readdir(dir, function (err, flist) {
        if (err) {
            return;
        }
        var elemNum = 0;
        var processEntry = function (entry) {
            arr.push(entry);
            //console.log(entry);
        };
        var dirIterator = function () {
            processEntry(flist[elemNum]);
            elemNum++;
            if (elemNum < flist.length) {
                process.nextTick(dirIterator);
            }
        };
        if (elemNum < flist.length) {
            process.nextTick(dirIterator);
        }
    });
}
*/
module.exports = router;