#!/bin/bash
cd /home/kavia/workspace/code-generation/to-do-list-app-12177-12289/ToDoListAppMonolith
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

