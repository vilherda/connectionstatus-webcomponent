VENDOR=vilherda
PRODUCT_NAME=connectionstatus-webcomponent
VERSION=`cat package.json | grep version | cut -d ':' -d '"' -f 4`

default: help

help:
	@echo "Available tasks: \\n\
	- help : prints this information message (default) \\n\
	- save : pushes the changes to the GitHub repository 'https://github.com/$(VENDOR)/$(PRODUCT_NAME)'. It needs a GitHub access previously configured. \\n\
	- package : creates a new release package on TAR.GZ format with the main content \\n\
	- publish : publishes a new version of '$(PRODUCT_NAME)' on 'https://npmjs.com'. It needs a session open previously.

save:
	git push

package:
	tar -czvf connectionstatus-webcomponent-$(VERSION).tar.gz connectionstatus.js demo.html LICENSE package.json README.md

publish:
	npm publish

release: save package publish
