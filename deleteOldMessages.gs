// Set `trashMessagesOlderThan()` to run once daily via a trigger. It will automatically clean the labels specified in the LABELS_TO_CLEAN array.

var gmail = GmailApp;
var remove_messages_older_than = 30; // How many days ago makes it old enough to trash?

LABELS_TO_CLEAN = [
  // "inbox",
  "Reports",
]

function trashMessagesOlderThan(days, labelName) {
  var days = days || remove_messages_older_than;
  var labelName = labelName || false;
  if (labelName == false) {
    for (label in LABELS_TO_CLEAN) {
      trashMessagesOlderThan(days, LABELS_TO_CLEAN[label]);
    }
  } else if (labelName.toLowerCase() == "inbox") {
    removeThreadsOlderThan(days, gmail.getInboxThreads());
  } else {
    removeThreadsOlderThan(days, gmail.getUserLabelByName(labelName).getThreads());
  }
}


function removeThreadsOlderThan(days, threads) {
  threads.forEach(function(x) {
  var d = x.getLastMessageDate();
   if (dateDiff(new Date(), x.getLastMessageDate()) > days) {
     x.moveToTrash();
   }
  });
}

// Returns the number of days between two dates.
// Accepts a 'from' and 'to' date as either a Date() object or an Integer UNIX time.
function dateDiff(from, to) {
  from = (typeof(from.getTime) === "function") ? from.getTime() : from;
  to = (typeof(to.getTime) === "function") ? to.getTime() : to;
//  Logger.log(typeof(from.getTime) === "function");
 var day = (((60 * 60) * 24) * 1000);
 return ((from - to) / day); 
  
}

function tdd() {
  Logger.log(typeof(new Date()));
  Logger.log(typeof(new Date().getTime()));
  Logger.log(typeof(new Date().getTime));
}

function getUnreadEmailsWithLabel(labelName) {
  var label = gmail.getUserLabelByName(labelName).getThreads();
  var unreadThreads = label.filter(function(l) {
    return l.isUnread()
  });
  return unreadThreads;
}
 