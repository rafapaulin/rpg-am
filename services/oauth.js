var ids = {
	facebook: {
		clientID: '1267685276578276',
		clientSecret: '5734253629ec0e6913697b583bbb9789',
		callbackURL: 'http://localhost/auth/facebook/callback',
		enableProof: true,
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