

export const controllers = [
    /* ===================================
       Hot Key Snippets
    =================================== */
    
    {  endpoint: '/api/hotkey/notes', method: 'GET', controller: 'getMethods' },
    {  endpoint: '/api/hotkey/notes', method: 'POST', controller: 'createNote' },
    {  endpoint: '/api/hotkey/notes/:noteId', method: 'GET', controller: 'getNoteById' },
    {  endpoint: '/api/hotkey/notes/:noteId', method: 'PUT', controller: 'updateNote' },
    {  endpoint: '/api/hotkey/notes/:noteId', method: 'DELETE', controller: 'deleteNote' },

    
    /* ===================================
       Req Doc
    =================================== */

    {  endpoint: '/api/reqdoc/projects', method: 'GET', controller: 'getProjects' },
    {  endpoint: '/api/reqdoc/projects', method: 'GET', controller: 'createProject' },
    {  endpoint: '/api/reqdoc/projects/:projectId', method: 'POST', controller: 'getProject' },
    {  endpoint: '/api/reqdoc/projects/:projectId', method: 'DELETE', controller: 'deleteProject' },
    {  endpoint: '/api/reqdoc/projects/:projectId', method: 'PUT', controller: 'updateProject' },

    {  endpoint: '/api/reqdoc/features', method: 'GET', controller: 'getFeatures' },
    {  endpoint: '/api/reqdoc/features', method: 'GET', controller: 'createFeature' },
    {  endpoint: '/api/reqdoc/features/:featureId', method: 'POST', controller: 'getFeature' },
    {  endpoint: '/api/reqdoc/features/:featureId', method: 'DELETE', controller: 'deleteFeature' },
    {  endpoint: '/api/reqdoc/features/:featureId', method: 'PUT', controller: 'updateFeature' },
    {  endpoint: '/api/reqdoc/features/:featureId/sub', method: 'POST', controller: 'createSubFeature' },
    {  endpoint: '/api/reqdoc/features/sort', method: 'PUT', controller: 'sortFeatures' },



]