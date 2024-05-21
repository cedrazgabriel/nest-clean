import {
  BadRequestException,
  Controller,
  HttpCode,
  Param,
  Patch,
} from '@nestjs/common'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { ChoseQuestionBestAnswerUseCase } from '@/domain/forum/application/use-cases/chose-question-best-answer'

@Controller('/answers/:answerId/choose-as-best')
export class ChoseQuestionBestAnswerController {
  constructor(
    private choseQuestionBestAnswerUseCase: ChoseQuestionBestAnswerUseCase,
  ) {}

  @Patch()
  @HttpCode(204)
  async handle(
    @CurrentUser() user: UserPayload,
    @Param('answerId') answerId: string,
  ) {
    const userId = user.sub

    const result = await this.choseQuestionBestAnswerUseCase.execute({
      authorId: userId,
      answerId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
