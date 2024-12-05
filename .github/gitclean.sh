#!/bin/bash
# Author: Nipun Senadheera
# Adapted from: https://gist.github.com/robmiller/5133264
# Helps clean up merged branches on remote

# Do this on main, might need to tweak later
git checkout main &> /dev/null

# Make sure we're working with the most up-to-date version of main.
git fetch

# Prune branches deleted on remote
git remote prune origin

# Delete branches fully merged into main
git branch --merged origin/main | grep -v 'main$' | xargs git branch -d

echo "\n 🧹 Done with local cleanup! \n"

# Now the same, but including remote branches.
MERGED_ON_REMOTE=`git branch -r --merged origin/main | sed 's/ *origin\///' | grep -v 'main$'`

if [ "$MERGED_ON_REMOTE" ]; then
	echo "The following remote branches are fully merged and will be removed:"
	echo $MERGED_ON_REMOTE

	read -p "Continue (y/N)? [⚠️ WARNING: This is for remote branches also, be careful!] "
	if [ "$REPLY" == "y" ]; then
		git branch -r --merged origin/main | sed 's/ *origin\///' \
			| grep -v 'main$' | xargs -I% git push origin :% 2>&1 \
			| grep --colour=never 'deleted'
		echo "Done!"
	fi
fi
