import { Module, HttpModule } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { SetModule } from 'src/card/set/set.module';
import { CardModule } from 'src/card/card.module';
import { TypeModule } from 'src/card/type/type.module';
import { SubTypeModule } from 'src/card/subtype/sub-type.module';
import { SuperTypeModule } from 'src/card/supertype/super-type.module';
import { CardImageModule } from 'src/card/card-image/card-image.module';
import { ColorModule } from 'src/card/color/color.module';

@Module({
  imports: [
    HttpModule,
    CardImageModule,
    ColorModule,
    SetModule,
    CardModule,
    TypeModule,
    SubTypeModule,
    SuperTypeModule,
  ],
  providers: [TasksService],
})
export class TasksModule {}
