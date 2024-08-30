package br.itb.project.uniaoVoluntaria.service;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import br.itb.project.uniaoVoluntaria.model.entity.Evento;
import br.itb.project.uniaoVoluntaria.model.repository.EventoRepository;
import jakarta.transaction.Transactional;

@Service
public class EventoService {
	private EventoRepository eventoRepository;

	public EventoService(EventoRepository eventoRepository) {
		super();
		this.eventoRepository = eventoRepository;
	}
	
	public List<Evento> findAll() {
		List<Evento> eventos = eventoRepository.findAll();
		
		return eventos;
	}
	
	public Evento findById(long id) {
    	Evento evento = eventoRepository.findById(id).orElseThrow();
    	
    	return evento;
    }
	
	@Transactional
	public Evento create(Evento evento) {
		
		evento.setStatusEvento("ATIVO");

		return eventoRepository.save(evento);
	}
	
	@Transactional
	public Evento inativar(long id) {
		Optional<Evento> _evento = eventoRepository.findById(id);
		if (_evento.isPresent()) {
			Evento eventoAtualizado = _evento.get();
			eventoAtualizado.setStatusEvento("INATIVO");
			
			return eventoRepository.save(eventoAtualizado);
		}
		return null;
	}
	
	@Transactional
	public Evento ativar(long id) {
		Optional<Evento> _evento = eventoRepository.findById(id);
		if (_evento.isPresent()) {
			Evento eventoAtualizado = _evento.get();
			eventoAtualizado.setStatusEvento("ATIVO");
			
			return eventoRepository.save(eventoAtualizado);
		}
		return null;
	}
	
	@Transactional
	public Evento alterarInfo(long id,Evento evento) {
		Optional<Evento> _evento = eventoRepository.findById(id);
		if (_evento.isPresent()) {
			Evento eventoAtualizado = _evento.get();
			
			String infos = evento.getInfos();
			eventoAtualizado.setInfos(infos);
			
			String horaInicio = evento.getHoraInicio();
			eventoAtualizado.setHoraInicio(horaInicio);
			
			int vagas = evento.getVagas();
			eventoAtualizado.setVagas(vagas);
			
			Date dataEventos = evento.getDataEvento();
			eventoAtualizado.setDataEvento(dataEventos);
			
			String cep = evento.getCep();
			eventoAtualizado.setCep(cep);
			
			long numero = evento.getNumero();
			eventoAtualizado.setNumero(numero);
			
			
			
			return eventoRepository.save(eventoAtualizado);
		}
		return null;
	}
}
