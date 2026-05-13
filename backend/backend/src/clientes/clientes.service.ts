import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Clientes } from './clientes.entity';
import { CreateClientesDto } from './dto/create-clientes.dto';
import { UpdateClientesDto } from './dto/update-clientes.dto';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Clientes)
    private readonly clientesRepository: Repository<Clientes>,
  ) { }

  findAll() {
    return this.clientesRepository.find({
      order: { id: 'ASC' },
      relations: ['appointments', 'appointments.negocio'],
    });
  }

  findOne(id: number) {
    return this.clientesRepository.findOneBy({ id });
  }

  create(createClientesDto: CreateClientesDto) {
    const cliente = this.clientesRepository.create(createClientesDto);
    return this.clientesRepository.save(cliente);
  }

  async update(id: number, updateClientesDto: UpdateClientesDto) {
    const cliente = await this.clientesRepository.findOneBy({ id });

    if (!cliente) {
      throw new NotFoundException(`No existe el cliente con id ${id}`);
    }

    const updatedCliente = this.clientesRepository.merge(cliente, updateClientesDto);
    return this.clientesRepository.save(updatedCliente);
  }

  async remove(id: number) {
    const cliente = await this.clientesRepository.findOneBy({ id });

    if (!cliente) {
      throw new NotFoundException(`No existe el cliente con id ${id}`);
    }

    await this.clientesRepository.remove(cliente);
    return { message: `Cliente ${id} eliminado correctamente` };
  }
}