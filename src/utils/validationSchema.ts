import {z} from "zod";

export const validationSchema = z
.object({
  email: z
    .string()
    .nonempty("メールアドレスを入力してください")
    .email("正しいメールアドレスを入力してください"),
  password: z
    .string()
    .nonempty("パスワードを入力してください")
    .min(6, "パスワードは6文字以上で入力してください")
    .regex(
      /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{6,100}$/i,
      'パスワードは半角英数字混合で入力してください'
    ),
  passwordConfirm: z
    .string()
    .nonempty("パスワードを入力してください")
    .min(6, "パスワードは6文字以上で入力してください"),
})
.superRefine(({ password, passwordConfirm }, ctx) => {
  if (password !== passwordConfirm) {
    ctx.addIssue({
      path: ['passwordConfirm'],
      code: 'custom',
      message: 'パスワードが一致しません',
    });
  }
})