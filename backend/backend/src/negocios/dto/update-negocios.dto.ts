import { PartialType } from '@nestjs/mapped-types';
import { CreateNegociosDto } from './create-negocios.dto';

export class UpdateNegociosDto extends PartialType(CreateNegociosDto) {}