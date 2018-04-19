/*
 * The gotrack project
 * 
 * Copyright (c) 2015 University of British Columbia
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

package ubc.pavlab.gotrack.converter;

import ubc.pavlab.gotrack.beans.Cache;
import ubc.pavlab.gotrack.model.Gene;

import javax.faces.application.FacesMessage;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.convert.Converter;
import javax.faces.convert.ConverterException;
import javax.faces.convert.FacesConverter;
import javax.inject.Inject;

/**
 * Converter for {@link Gene}.
 * 
 * @author mjacobson
 * @version $Id$
 */
@FacesConverter(value="geneConverter", managed = true)
public class GeneConverter implements Converter {

    @Inject
    private Cache cache;

    public GeneConverter() {
    }

    @Override
    public Object getAsObject( FacesContext fc, UIComponent uic, String accession ) {
        if ( accession != null && accession.trim().length() > 0 ) {
            try {
                return cache.getCurrentGene( accession );
            } catch ( NumberFormatException e ) {
                throw new ConverterException(
                        new FacesMessage( FacesMessage.SEVERITY_ERROR, "Conversion Error", "Not a valid gene." ) );
            }
        } else {
            return null;
        }
    }

    @Override
    public String getAsString( FacesContext fc, UIComponent uic, Object object ) {
        if ( object != null ) {
            return ((Gene) object).getAccession().getAccession();
        } else {
            return null;
        }
    }
}
