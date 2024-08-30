package br.itb.project.uniaoVoluntaria.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import br.itb.project.uniaoVoluntaria.model.entity.Candidatura;
import br.itb.project.uniaoVoluntaria.model.repository.CandidaturaRepository;
import jakarta.transaction.Transactional;

@Service
public class CandidaturaService {
	private CandidaturaRepository candidaturaRepository;

	public CandidaturaService(CandidaturaRepository candidaturaRepository) {
		super();
		this.candidaturaRepository = candidaturaRepository;
	}
	public List<Candidatura> findAll() {
		List<Candidatura> candidaturas = candidaturaRepository.findAll();
		
		return candidaturas;
	}
	public Candidatura findById(long id) {
    	Candidatura candidatura = candidaturaRepository.findById(id).orElseThrow();
    	
    	return candidatura;
    }
	
	@Transactional
	public Candidatura create(Candidatura candidatura) {
		
		candidatura.setStatusCadastro("PENDENTE");
		candidatura.setDataCadastro(LocalDateTime.now());

		return candidaturaRepository.save(candidatura);
	}
	
	@Transactional
	public Candidatura admitido(long id) {
		Optional<Candidatura> _candidatura = candidaturaRepository.findById(id);
		if (_candidatura.isPresent()) {
			Candidatura candidaturaAtualizada = _candidatura.get();
			candidaturaAtualizada.setStatusCadastro("ADMITIDO");;
			
			return candidaturaRepository.save(candidaturaAtualizada);
		}
		return null;
	}
	}
