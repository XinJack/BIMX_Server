var mongoose = require('mongoose');

var BookmarkSchema = mongoose.Schema({
	modelId: String,
	bookmarks: Array
});

var Bookmark = mongoose.model('bookmark', BookmarkSchema);

module.exports.getBookmarksByModelId = function(modelId) {
	return Bookmark.findOne({
		modelId: modelId
	}).exec().then(function(data) {
		if(data === null) return Promise.resolve([]);
		else return Promise.resolve(data.bookmarks);
	}).catch(function(err){
		console.log(err);
		return Promise.resolve([]);
	});
}

module.exports.updateBookmarksByModelId = function(modelId, bookmarks) {
	return Bookmark.findOneAndUpdate({
		modelId: modelId
	}, {
		modelId: modelId,
		bookmarks: bookmarks
	}).exec().then(function(data){
		if(data === null) return Promise.resolve(false);
		else return Promise.resolve(true);
	}).catch(function(err) {
		console.log(err);
		return Promise.resolve(false);
	});
}