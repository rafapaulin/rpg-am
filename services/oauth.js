var ids = {
	facebook: {
		clientID: '1267685276578276',
		clientSecret: '5734253629ec0e6913697b583bbb9789',
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
	twitter: {
		consumerKey: '969UAd5MQ0kVdQL7fCbfTMA8E',
		consumerSecret: 'MNAvx0bAXtXCF7YOu9uJPwXua6Wm5SYQLTaurfYv8sQEMtSxb1',
		callbackURL: "http://localhost/auth/twitter/callback",
		includeEmail: true
	},
	google: {
		clientID: '925353513895-o5komlgudssh17fqgg94v356hri287v5.apps.googleusercontent.com',
        clientSecret: 'rlYSKdfOa3J_3izSg3TsgfY4',
		callbackURL: 'http://localhost/auth/google/callback',
	}
};

module.exports = ids;