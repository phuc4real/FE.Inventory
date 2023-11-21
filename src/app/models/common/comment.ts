export interface CommentResponse {
  id: number;
  commentAt: Date;
  commentBy: string;
  isReject: boolean;
  message: string;
}

export interface CreateCommentRequest {
  recordId: number;
  isTicketComment: boolean;
  isReject: boolean;
  message: string;
}
