export const reqs = [
  {
    "_id": "660bfd364ebc059e8b2031f1",
    "key": "Req-001",
    "title": "Invite existing user to team",
    "text": "Team admins can invite users that already have an account on Req Doc to their team. When they invite an existing user, their account will be updated to have the field \"pendingInvitations\", which will be an array of team IDs they have been invited to, but haven't accepted invitations yet. ",
    "feature": "660bfca64ebc059e8b2031dc",
    "sort": 0,
    "createdAt": "2024-04-02T12:42:30.178Z",
    "updatedAt": "2024-04-02T12:45:40.033Z",
    "details": "<ul><li>Go to teams page</li><li>Click on Invite Users</li><li>An email will be sent to the invited user</li><li>The invited user's account will be updated to include the team ID in the pendingInvitations array</li></ul>"
  },
  {
    "_id": "660c0b100ef8afcc51b89ae8",
    "key": "REQ-002",
    "title": "Accept team invite as existing and logged in user",
    "text": "The invited user will receive an invitation link via email, that link will redirect them to a page where they can accept the invitation. Once they accept, the team ID will be removed from their pending invitations and the user will be added to the team. After successfully accepting, the user will be redirected to the team's first project.",
    "feature": "660bfca64ebc059e8b2031dc",
    "sort": 1,
    "createdAt": "2024-04-02T13:41:36.550Z",
    "updatedAt": "2024-04-02T13:53:05.913Z"
  },
  {
    "_id": "660c0bf10ef8afcc51b89b17",
    "key": "REQ-003",
    "title": "Accept team invite as existing, not logged in user",
    "text": "The invited user will receive an invitation link via email, that link will redirect them to a page where they can log in to accept their invite. After logging in, the user will see the \"Accept\" button. Once they accept, the team ID will be removed from their pending invitations and the user will be added to the team. After successfully accepting, the user will be redirected to the team's first project.",
    "feature": "660bfca64ebc059e8b2031dc",
    "sort": 2,
    "createdAt": "2024-04-02T13:45:21.952Z",
    "updatedAt": "2024-04-02T13:53:10.675Z"
  },
  {
    "_id": "660c0c460ef8afcc51b89b23",
    "key": "REQ-004",
    "title": "Decline team invite",
    "text": "If an existing user declines the invite, the team ID will be removed from their pending invitations and no further action will be taken.",
    "feature": "660bfca64ebc059e8b2031dc",
    "sort": 3,
    "createdAt": "2024-04-02T13:46:46.659Z",
    "updatedAt": "2024-04-02T13:46:46.659Z"
  },
  {
    "_id": "660c0cc90ef8afcc51b89b2f",
    "key": "REQ-005",
    "title": "Invite non existing user to a team",
    "text": "Team admins can invite users that don't have an account on Req Doc. When they invite a non existing user, a pending user record will be created with the provided email and the field pending invitations that will include the team ID. ",
    "feature": "660bfca64ebc059e8b2031dc",
    "sort": 4,
    "createdAt": "2024-04-02T13:48:57.316Z",
    "updatedAt": "2024-04-02T13:48:57.316Z"
  },
  {
    "_id": "660c0db10ef8afcc51b89b3b",
    "key": "REQ-006",
    "title": "Accept team invite as new user",
    "text": "The invited user will receive an email with an invite link that will redirect them to a page where they can log in to accept the invite, or sign up if they don't have an account yet. If they choose to sign up, a new firebase auth record will be created for them, and the system will check for pending users. If the pending user has the team ID in their pending invitations, the team ID will be removed, and the user will be added to the team.",
    "feature": "660bfca64ebc059e8b2031dc",
    "sort": 5,
    "createdAt": "2024-04-02T13:52:49.526Z",
    "updatedAt": "2024-04-02T13:52:57.722Z"
  },
  {
    "_id": "667433c04f24cf1c11836ebb",
    "key": "REQ-007",
    "title": "Sort main and sub feature reqs",
    "text": "All reqs of a main feature will be sorted within the main feature, regardless of wether they belong to sub features or not. When sorting reqs within a sub feature, their sorting numbers need to take their spot in the main feature list into account.\n",
    "feature": "667433724f24cf1c11836ea5",
    "sort": 0,
    "createdAt": "2024-06-20T13:50:56.879Z",
    "updatedAt": "2024-06-20T14:26:38.988Z",
    "details": "<p><strong>Main Feature</strong></p><p><br></p><p>\t<strong>Sub Feature 1</strong></p><p>\t\tReq 1 (Sort: 0)</p><p>\t\tReq 2 (Sort: 1)</p><p>\t\tReq 3 (Sort: 3)</p><p><br></p><p>\t<strong>Sub Feature 2</strong></p><p>\t\tReq 1 (Sort: 4)</p><p>\t\tReq 2 (Sort: 5)</p><p><br></p><p>\t<strong>Sub Feature 3</strong></p><p>\t\tReq 1 (Sort: 6)</p><p>\t\tReq 2 (Sort: 7)</p>"
  },
  {
    "_id": "66758c4e5d4ed4174c04e37c",
    "key": "REQ-008",
    "text": "@property {objectId} _id\n @property {objectId} project\n @property {objectId} feature\n @property {objectId} [main_feature]\n @property {string} key\n @property {string} text\n @property {'passed' | 'failed' | null } state\n @property {number} sort\n @property {date} createdAt\n @property {date} updatedAt\n @property {date} [deleted]\n @property {string} [title]\n @property {string} [changed_req]\n @property {array<Req>} [history]\n @property {array<Comment>} [comments]",
    "feature": "66758c0a5d4ed4174c04e370",
    "sort": 0,
    "createdAt": "2024-06-21T14:21:02.473Z",
    "updatedAt": "2024-06-21T14:28:10.208Z",
    "deleted": {
      "$date": "2024-06-21T14:28:10.208Z"
    }
  },
  {
    "_id": "66758c5d5d4ed4174c04e388",
    "key": "REQ-009",
    "title": "_id",
    "text": "Mongoose ID",
    "feature": "66758c0a5d4ed4174c04e370",
    "sort": 1,
    "createdAt": "2024-06-21T14:21:17.550Z",
    "updatedAt": "2024-06-21T14:26:15.165Z",
    "deleted": {
      "$date": "2024-06-21T14:26:15.165Z"
    }
  },
  {
    "_id": "66758c7f5d4ed4174c04e394",
    "key": "REQ-010",
    "title": "project",
    "text": "objectId | REQDOC_Project",
    "feature": "66758c0a5d4ed4174c04e370",
    "sort": 2,
    "createdAt": "2024-06-21T14:21:51.385Z",
    "updatedAt": "2024-06-26T14:16:33.008Z",
    "details": "<p><span class=\"ql-font-monospace\">{</span></p><p><span class=\"ql-font-monospace\">    </span><span class=\"ql-font-monospace\" style=\"color: rgb(163, 21, 21);\">\"_id\"</span><span class=\"ql-font-monospace\">: </span><span class=\"ql-font-monospace\" style=\"color: rgb(4, 81, 165);\">\"6626d72d61a9c8f046532db2\"</span><span class=\"ql-font-monospace\">,</span></p><p><span class=\"ql-font-monospace\">    </span><span class=\"ql-font-monospace\" style=\"color: rgb(163, 21, 21);\">\"key\"</span><span class=\"ql-font-monospace\">: </span><span class=\"ql-font-monospace\" style=\"color: rgb(4, 81, 165);\">\"WES-043\"</span><span class=\"ql-font-monospace\">,</span></p><p><span class=\"ql-font-monospace\">    </span><span class=\"ql-font-monospace\" style=\"color: rgb(163, 21, 21);\">\"title\"</span><span class=\"ql-font-monospace\">: </span><span class=\"ql-font-monospace\" style=\"color: rgb(4, 81, 165);\">\"Add option to product\"</span><span class=\"ql-font-monospace\">,</span></p><p><span class=\"ql-font-monospace\">    </span><span class=\"ql-font-monospace\" style=\"color: rgb(163, 21, 21);\">\"text\"</span><span class=\"ql-font-monospace\">: </span><span class=\"ql-font-monospace\" style=\"color: rgb(4, 81, 165);\">\"Req description\"</span><span class=\"ql-font-monospace\">,</span></p><p><span class=\"ql-font-monospace\">    </span><span class=\"ql-font-monospace\" style=\"color: rgb(163, 21, 21);\">\"project\"</span><span class=\"ql-font-monospace\">: </span><span class=\"ql-font-monospace\" style=\"color: rgb(4, 81, 165);\">\"657e1947b1e1aef9332709dc\"</span><span class=\"ql-font-monospace\">,</span></p><p><span class=\"ql-font-monospace\">    </span><span class=\"ql-font-monospace\" style=\"color: rgb(163, 21, 21);\">\"feature\"</span><span class=\"ql-font-monospace\">: {</span></p><p><span class=\"ql-font-monospace\">        </span><span class=\"ql-font-monospace\" style=\"color: rgb(163, 21, 21);\">\"_id\"</span><span class=\"ql-font-monospace\">: </span><span class=\"ql-font-monospace\" style=\"color: rgb(4, 81, 165);\">\"6616d43cc1dbbd0fd6714fc4\"</span><span class=\"ql-font-monospace\">,</span></p><p><span class=\"ql-font-monospace\">        </span><span class=\"ql-font-monospace\" style=\"color: rgb(163, 21, 21);\">\"name\"</span><span class=\"ql-font-monospace\">: </span><span class=\"ql-font-monospace\" style=\"color: rgb(4, 81, 165);\">\"Product Options\"</span><span class=\"ql-font-monospace\">,</span></p><p><span class=\"ql-font-monospace\">        </span><span class=\"ql-font-monospace\" style=\"color: rgb(163, 21, 21);\">\"project\"</span><span class=\"ql-font-monospace\">: </span><span class=\"ql-font-monospace\" style=\"color: rgb(4, 81, 165);\">\"657e1947b1e1aef9332709dc\"</span><span class=\"ql-font-monospace\">,</span></p><p><span class=\"ql-font-monospace\">        </span><span class=\"ql-font-monospace\" style=\"color: rgb(163, 21, 21);\">\"main_feature\"</span><span class=\"ql-font-monospace\">: </span><span class=\"ql-font-monospace\" style=\"color: rgb(4, 81, 165);\">\"65e37fd0fbb15b57fb5990af\"</span><span class=\"ql-font-monospace\">,</span></p><p><span class=\"ql-font-monospace\">        </span><span class=\"ql-font-monospace\" style=\"color: rgb(163, 21, 21);\">\"sort\"</span><span class=\"ql-font-monospace\">: </span><span class=\"ql-font-monospace\" style=\"color: rgb(9, 134, 88);\">1</span></p><p><span class=\"ql-font-monospace\">    },</span></p><p><span class=\"ql-font-monospace\">    </span><span class=\"ql-font-monospace\" style=\"color: rgb(163, 21, 21);\">\"sort\"</span><span class=\"ql-font-monospace\">: </span><span class=\"ql-font-monospace\" style=\"color: rgb(9, 134, 88);\">3</span><span class=\"ql-font-monospace\">,</span></p><p><span class=\"ql-font-monospace\">    </span><span class=\"ql-font-monospace\" style=\"color: rgb(163, 21, 21);\">\"comments\"</span><span class=\"ql-font-monospace\">: [],</span></p><p><span class=\"ql-font-monospace\">    </span><span class=\"ql-font-monospace\" style=\"color: rgb(163, 21, 21);\">\"createdAt\"</span><span class=\"ql-font-monospace\">: </span><span class=\"ql-font-monospace\" style=\"color: rgb(4, 81, 165);\">\"2024-04-22T21:31:25.517Z\"</span><span class=\"ql-font-monospace\">,</span></p><p><span class=\"ql-font-monospace\">    </span><span class=\"ql-font-monospace\" style=\"color: rgb(163, 21, 21);\">\"updatedAt\"</span><span class=\"ql-font-monospace\">: </span><span class=\"ql-font-monospace\" style=\"color: rgb(4, 81, 165);\">\"2024-06-23T15:05:50.605Z\"</span><span class=\"ql-font-monospace\">,</span></p><p><span class=\"ql-font-monospace\">    </span><span class=\"ql-font-monospace\" style=\"color: rgb(163, 21, 21);\">\"details\"</span><span class=\"ql-font-monospace\">: </span><span class=\"ql-font-monospace\" style=\"color: rgb(4, 81, 165);\">\"Req Details\"</span><span class=\"ql-font-monospace\">,</span></p><p><span class=\"ql-font-monospace\">    </span><span class=\"ql-font-monospace\" style=\"color: rgb(163, 21, 21);\">\"main_feature\"</span><span class=\"ql-font-monospace\">: </span><span class=\"ql-font-monospace\" style=\"color: rgb(4, 81, 165);\">\"65e37fd0fbb15b57fb5990af\"</span><span class=\"ql-font-monospace\">,</span></p><p><span class=\"ql-font-monospace\">    </span><span class=\"ql-font-monospace\" style=\"color: rgb(163, 21, 21);\">\"history\"</span><span class=\"ql-font-monospace\">: []</span></p><p><span class=\"ql-font-monospace\">}</span></p>"
  },
  {
    "_id": "66758ce05d4ed4174c04e3aa",
    "key": "REQ-011",
    "title": "feature",
    "text": "objectId | REQDOC_Feature\nThis can be either a main or sub feature. If the req has a main_feature, feature will be the objectId of the sub feature. If main_feature is null, the feature will be the object Id of a main feature",
    "feature": "66758c0a5d4ed4174c04e370",
    "sort": 3,
    "createdAt": "2024-06-21T14:23:28.852Z",
    "updatedAt": "2024-06-21T14:26:57.826Z"
  },
  {
    "_id": "66758dee5d4ed4174c04e3fb",
    "key": "REQ-012",
    "title": "main_feature",
    "text": "objectId | REQDOC_Feature\nIf the req belongs to a sub feature, this will be the objectId for the main feature the sub feature belongs to. If the req belongs to a main feature, main_feature will be null.",
    "feature": "66758c0a5d4ed4174c04e370",
    "sort": 4,
    "createdAt": "2024-06-21T14:27:58.698Z",
    "updatedAt": "2024-06-21T14:27:58.698Z"
  }
]