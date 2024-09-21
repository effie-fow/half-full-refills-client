export const countVotes = (votesIdArray, targetVoteId) => {
  return votesIdArray.reduce((a, v) => (v === targetVoteId ? a + 1 : a), 0);
};
