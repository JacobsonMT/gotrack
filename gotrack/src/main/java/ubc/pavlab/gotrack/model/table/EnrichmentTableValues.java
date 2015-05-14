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

package ubc.pavlab.gotrack.model.table;

import ubc.pavlab.gotrack.analysis.EnrichmentResult;
import ubc.pavlab.gotrack.model.Edition;
import ubc.pavlab.gotrack.model.GeneOntologyTerm;

/**
 * TODO Document Me
 * 
 * @author mjacobson
 * @version $Id$
 */
public class EnrichmentTableValues implements Comparable<EnrichmentTableValues> {

    // private final String rowKey;
    private final Edition edition;
    private final GeneOntologyTerm term;
    private final EnrichmentResult result;
    private final boolean significant;

    public EnrichmentTableValues( Edition edition, GeneOntologyTerm term, EnrichmentResult result, boolean significant ) {
        super();
        this.edition = edition;
        this.term = term;
        this.result = result;
        this.significant = significant;
        // this.rowKey = edition.getEdition().toString() + term.getGoId();
    }

    public Edition getEdition() {
        return edition;
    }

    public GeneOntologyTerm getTerm() {
        return term;
    }

    public EnrichmentResult getResult() {
        return result;
    }

    public boolean isSignificant() {
        return significant;
    }

    @Override
    public String toString() {
        return "EnrichmentTableValues [edition=" + edition + ", term=" + term + ", result=" + result + "]";
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ( ( edition == null ) ? 0 : edition.hashCode() );
        result = prime * result + ( ( term == null ) ? 0 : term.hashCode() );
        return result;
    }

    @Override
    public boolean equals( Object obj ) {
        if ( this == obj ) return true;
        if ( obj == null ) return false;
        if ( getClass() != obj.getClass() ) return false;
        EnrichmentTableValues other = ( EnrichmentTableValues ) obj;
        if ( edition == null ) {
            if ( other.edition != null ) return false;
        } else if ( !edition.equals( other.edition ) ) return false;
        if ( term == null ) {
            if ( other.term != null ) return false;
        } else if ( !term.equals( other.term ) ) return false;
        return true;
    }

    @Override
    public int compareTo( EnrichmentTableValues o ) {
        // sort according to rank, if ranks are the same sort by goId
        int comparison = Double.compare( this.result.getRank(), o.getResult().getRank() );

        return comparison == 0 ? this.term.compareTo( o.getTerm() ) : comparison;
    }

}
