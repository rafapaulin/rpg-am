var ids = {
	facebook: {
		clientID: '890656767746313',
		clientSecret: '491e79739122a45e785d1e36f8fe7926',
		callbackURL: 'http://localhost/auth/facebook/callback',
		profileFields: [
			'id',
			'displayName',
			'email',
			'first_name',
			'middle_name',
			'last_name',
			'link',
			'gender',
			'locale',
			'picture.type(large)',
			'timezone',
		]
	},
	twitter: {},
	google: {}
};

module.exports = ids;