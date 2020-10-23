VENDOR=vilherda
PRODUCT_NAME=connectionstatus-webcomponent

default: help

help:
	@echo "Available tasks: \\n\
	- help : prints this information message (default) \\n\
	- save : pushes the changes to the GitHub repository 'https://github.com/$(VENDOR)/$(PRODUCT_NAME)'. It needs a GitHub access previously configured. \\n\
	- publish : publishes a new version of '$(PRODUCT_NAME)' on 'https://npmjs.com'. It needs a session open previously.

save:
	git push

publish:
	npm publish

release: save publish
