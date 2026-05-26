import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Clientes } from './clientes.entity';
import { CreateClientesDto } from './dto/create-clientes.dto';
import { UpdateClientesDto } from './dto/update-clientes.dto';

import * as bcrypt from 'bcryptjs';

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

  async register(createClientesDto: CreateClientesDto) {
    if (createClientesDto.password) {
      const salt = await bcrypt.genSalt(10);
      createClientesDto.password = await bcrypt.hash(createClientesDto.password, salt);
    }
    // Check if customer with this email already exists
    const existing = await this.clientesRepository.findOneBy({ Correo: createClientesDto.Correo });
    if (existing) {
      // If they exist but have no password, update their password
      if (!existing.password && createClientesDto.password) {
         existing.password = createClientesDto.password;
         return this.clientesRepository.save(existing);
      }
      throw new Error('El correo ya está registrado');
    }

    const cliente = this.clientesRepository.create(createClientesDto);
    return this.clientesRepository.save(cliente);
  }

  async login(correo: string, pass: string) {
    const cliente = await this.clientesRepository.findOneBy({ Correo: correo });
    if (!cliente) {
      throw new NotFoundException('Cliente no encontrado');
    }
    if (!cliente.password) {
      throw new NotFoundException('El cliente no tiene contraseña configurada');
    }
    const isMatch = await bcrypt.compare(pass, cliente.password);
    if (!isMatch) {
      throw new NotFoundException('Contraseña incorrecta');
    }
    const { password, ...result } = cliente;
    return result;
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