export function getTimeAgoFromISO(isoDate: string, isMenu: boolean = false): string {
  const date = new Date(isoDate);
  const now = new Date();
  const secondsAgo = Math.round((now.getTime() - date.getTime()) / 1000);
  const minutesAgo = Math.round(secondsAgo / 60);
  const hoursAgo = Math.round(minutesAgo / 60);
  const daysAgo = Math.round(hoursAgo / 24);

  if (secondsAgo < 60) {
    return "just now";
  }
  if (minutesAgo < 60) {
    return isMenu ? `${minutesAgo}m ago` : `${minutesAgo} mins ago`;
  }
  if (hoursAgo < 24) {
    return isMenu ? `${hoursAgo}h ago` : `${hoursAgo} hours ago`;
  }
  if (daysAgo === 1) {
    return "yesterday";
  }
  if (daysAgo < 7) {
    return isMenu ? `${daysAgo}d ago` : `${daysAgo} days ago`;
  }
  if (daysAgo === 7) {
    return "1 week ago";
  }

  // for dates more than 7 days ago, give a precise date
  const fullFormatter = new Intl.DateTimeFormat("en-US", {
    year: "2-digit",
    month: "short",
    day: "numeric",
  });

  return fullFormatter.format(date);
}
