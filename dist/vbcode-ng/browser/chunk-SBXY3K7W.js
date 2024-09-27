import{a as p,c as f}from"./chunk-AC5BHCOO.js";import{a as u}from"./chunk-GPERB25D.js";import{B as d,C as m,x as c}from"./chunk-47XNO6PC.js";import{ga as l,h as o,ma as i}from"./chunk-VMVCLMWB.js";import{g as t}from"./chunk-GAL4ENT6.js";var s="actions",k=(()=>{class r{supabase=i(m).supabase;playerService=i(u);user_player=c(d.user_player);allColsInclBreakdown="*, player_id (id, name, trikot) ";getActionsOfLastEventByPlayer(e){return t(this,null,function*(){try{return(yield this.supabase.from(s).select(this.allColsInclBreakdown).eq("player_id",e.id)).data}catch(a){return console.error("Error fetching actions of last event by user: ",a),null}})}getActionsOfEventByPlayer(e,a){return t(this,null,function*(){return(yield this.supabase.from(s).select(this.allColsInclBreakdown).eq("game_id",e).eq("player_id",a)).data})}getActionsOfEventByGradeAndPlayer(e,a,n){return t(this,null,function*(){return(yield this.supabase.from(s).select(this.allColsInclBreakdown).eq("game_id",e).eq("grade",a).eq("player_id",n)).data})}getActionsOfEventByGrade(e,a){return t(this,null,function*(){return(yield this.supabase.from(s).select(this.allColsInclBreakdown).eq("game_id",e).eq("grade",a)).data})}getActionsOfEventByKindAndGrade(e,a,n){return t(this,null,function*(){return(yield this.supabase.from(s).select(this.allColsInclBreakdown).eq("game_id",e).eq("kind",a).eq("grade",n)).data})}getActionsOfEventByKindAndPlayer(e,a,n){return t(this,null,function*(){return(yield this.supabase.from(s).select(this.allColsInclBreakdown).eq("game_id",e).eq("kind",a).eq("player_id",n)).data})}getActionsOfEventByKind(e,a){return t(this,null,function*(){return(yield this.supabase.from(s).select(this.allColsInclBreakdown).eq("game_id",e).eq("kind",a)).data})}getActionsOfEvent(e){return t(this,null,function*(){return(yield this.supabase.from(s).select(this.allColsInclBreakdown).order("created_at").eq("game_id",e)).data})}getActionsOfEventOfSet(e,a){return t(this,null,function*(){return(yield this.supabase.from(s).select(this.allColsInclBreakdown).eq("game_id",e).eq("game_set",a)).data})}getActions(){return t(this,null,function*(){return(yield this.supabase.from(s).select(this.allColsInclBreakdown)).data})}createAction(e){return t(this,null,function*(){return(yield this.supabase.from(s).upsert(e).select()).data})}getAcesOfEvent(e){return t(this,null,function*(){return(yield this.supabase.from(s).select("*").eq("game_id",e).eq("kind",f.Serve).eq("grade",p["#"])).data})}deleteAction(e){return t(this,null,function*(){return(yield this.supabase.from(s).delete().eq("id",e)).data})}actionChangesChannel=this.supabase.channel("actions-all-channel").on("postgres_changes",{event:"*",schema:"public",table:"actions"},e=>{this.actions$.next(e)}).subscribe();actions$=new o(null);static \u0275fac=function(a){return new(a||r)};static \u0275prov=l({token:r,factory:r.\u0275fac,providedIn:"root"})}return r})();export{k as a};