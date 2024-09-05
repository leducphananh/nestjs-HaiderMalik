import {
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Put,
} from '@nestjs/common';
import { SongsService } from './songs.service';

@Controller('songs')
export class SongsController {
    constructor(private songsService: SongsService) {}

    @Get()
    findAll() {
        try {
            return this.songsService.findAll();
        } catch (e) {
            throw new HttpException(
                'server error',
                HttpStatus.INTERNAL_SERVER_ERROR,
                { cause: e },
            );
        }
    }

    @Get(':id')
    findOne(
        @Param(
            'id',
            new ParseIntPipe({
                errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
            }),
        )
        id: number,
    ) {
        return `fetch song on the based on id ${typeof id}`;
    }

    @Post()
    create() {
        return this.songsService.create('Animals by Martin Garrix');
    }

    @Put(':id')
    update() {
        return 'update song on the based on id';
    }

    @Delete(':id')
    delete() {
        return 'delete a song on the based on id';
    }
}
