// 手动声明 ElMessage
declare module 'element-plus' {
  export class ElMessage {
    static success(message: string): void;
    static warning(message: string): void;
    static info(message: string): void;
    static error(message: string): void;
  }
}

declare module 'swiper';

declare const process: any;

type BlogType = {
  title: string;
  subTitle: string;
  category: string;
  image: {
    name: string;
    url: string;
  };
  isOriginal: boolean;
  like: number;
  see: number;
  tags: string[];
  publishTime: number;
  updateTime: number;
  htmlContent?: string;
  markdownContent?: string;
  comments?: Comments[];
  _id: string;
};

// 评论
type Comment = {
  id: string; // 评论id，后端自动生成
  arthur: string; // 评论作者，前端传
  email: string; // 评论作者的邮箱，前端传
  content: string; // 评论内容，前端传
  reply: Reply[]; // 该评论下面所有的回复
  date: number; // 评论时间
  isHide: boolean; // 是否需要隐藏
};

// 评论下的回复
type Reply = {
  parentId: string; // 哪条评论下的回复
  replyId: string; // 回复的哪条评论
  isReplyParent: boolean; // 是否对父级评论的回复

  replyArthur: string; // 回复的哪个作者
  replyEmail: string; // 回复的哪个邮箱
  replyContent: string; // 回复的哪个内容

  id: string; // 本回复的id
  arthur: string; // 本回复的作者
  email: string; // 本回复的作者邮箱
  content: string; // 本回复的内容
  date: number; // 回复时间
  isHide: boolean; // 是否需要隐藏
};
