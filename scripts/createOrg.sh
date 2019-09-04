echo "*** Creating scratch Org..."
sfdx force:org:create -f config/project-scratch-def.json --setdefaultusername -a wheresAstro -d 30
echo "*** Opening scratch Org..."
sfdx force:org:open
echo "*** Pushing metadata to scratch Org..."
sfdx force:source:push
echo "*** Creating required users..."
sfdx force:apex:execute -f scripts/apexCommands.txt